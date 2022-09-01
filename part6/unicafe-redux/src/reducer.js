const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGood = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return newGood
    case 'OK':
      const newOk = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      return newOk
    case 'BAD':
      const newBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      return newBad
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer