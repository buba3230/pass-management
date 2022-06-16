export enum ActionTypes {
    //create action types
    CREATE_USER = '[USER] Create',
    CREATE_USER_SUCCESS = '[USER] Create success',
    CREATE_USER_FAILURE = '[USER] Create failure',
    //update action types
    UPDATE_USER = '[USER] Update',
    UPDATE_USER_SUCCESS = '[USER] Update success',
    UPDATE_USER_FAILURE = '[USER] Update failure',
    //get USER by ID action types
    GET_USER_BY_ID = '[USER] Get user by id',
    GET_USER_BY_ID_SUCCESS = '[USER] Get user by id success',
    GET_USER_BY_ID_FAILURE = '[USER] Get user by id failure',
    //get USER by name and password action types
    GET_USER_BY_INFO = '[USER] Get user by info',
    GET_USER_BY_INFO_FAILURE = '[USER] Get user by info failure',
    //**ACCOUNTS**/
    //create action types
    CREATE_ACCOUNT = '[ACCOUNT] Create',
    CREATE_ACCOUNT_FAILURE = '[ACCOUNT] Create failure',
    //update action types
    UPDATE_ACCOUNT = '[ACCOUNT] Update',
    UPDATE_ACCOUNT_FAILURE = '[ACCOUNT] Update failure',
    //delete action types
    DELETE_ACCOUNT = '[ACCOUNT] Delete',
    DELETE_ACCOUNT_FAILURE = '[ACCOUNT] Delete failure',
}

