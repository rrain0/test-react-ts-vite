import React, { useEffect, useState } from 'react';

const addFirstHistoryEntry = () => window.history.replaceState({ isFirst: true }, '');
const addSecondHistoryEntry = () => window.history.pushState({ isSecond: true }, '');
const prepareHistory = () => {
    if (!window.history.state?.isFirst && !window.history.state?.isSecond) addFirstHistoryEntry();
    if (window.history.state?.isFirst) addSecondHistoryEntry();
};

const GameExitControllerLogic = React.memo(() => {
    useEffect(() => {
        prepareHistory();
    }, []);

    const [isQuitGame, setIsQuitGame] = useState(false);

    useEffect(() => {
        const onPopState = (ev: PopStateEvent) => {
            if (ev.state.isFirst) {
                if (isQuitGame) window.history.back();
                else {
                    addSecondHistoryEntry();

                    //if (!isConfirmModalShown) showConfirmModal()
                    const c = window.confirm('Выйти из игры?');
                    if (c) setIsQuitGame(true);
                }
            }
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, [isQuitGame]);

    useEffect(() => {
        while (isQuitGame && !window.history.state?.isFirst) window.history.back();
    }, [isQuitGame]);

    return undefined;
});

const GameExitController = React.memo(() => {
    return <GameExitControllerLogic />;
})
export default GameExitController;
