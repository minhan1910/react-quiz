class BaseReducer {
  constructor(state, action) {
    this.state = state;
    this.action = action;
    this.actionHandler = this.#buildHandlerReducer();

    if (!this.actionHandler) {
      throw new Error(`Reducer has no handler for type: ${action.type}`);
    }
  }

  initHandlerReducer() {
    throw new Error("This method should be overridden by child classes.");
  }

  #buildHandlerReducer() {
    const handlerFromChildReducer = this.initHandlerReducer();

    const getAction = handlerFromChildReducer[this.action.type];

    // get real action from action handler
    return getAction();
  }
  
  build() {
    return this.actionHandler();
  }

  static adapter() {
    return (state, action) => {
      return new this(state, action).build();
    };
  }
}

export default BaseReducer;
