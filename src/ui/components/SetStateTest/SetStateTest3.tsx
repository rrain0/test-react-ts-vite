import React from 'react';



type SetStateTest3State = {
  needToIncrement: boolean
  count: number
}


class SetStateTest3 extends React.Component<object, SetStateTest3State> {
  constructor(props) {
    super(props);
    this.state = {
      needToIncrement: false,
      count: 0,
    }
  }
  
  
  override componentDidUpdate(
    prevProps: Readonly<object>,
    prevState: Readonly<SetStateTest3State>,
    snapshot?: any
  ) {
    // в общем прибавляет 1, а не 2
    if (this.state.needToIncrement){
      this.setState({
        needToIncrement: false,
        count: this.state.count+1
      })
      this.setState({
        needToIncrement: false,
        count: this.state.count+1
      })
    }
  }
  
  
  override render(){
    return <div>
      <div>count is: {this.state.count}</div>
      <button
        onClick={()=>this.setState(prev=>({ ...prev, needToIncrement: true }))}
      >
        +2
      </button>
    </div>
  }
}
export default SetStateTest3
