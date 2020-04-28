import ticketListReducer from '../../reducers/ticket-list-reducer';

describe('ticketListReducer', () => {
	
  const currentState = {
    1: {
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1 
    }, 
    2: {
      names: 'Jasmine and Justine',
      location: '2a',
      issue: 'Reducer has side effects.',
      id: 2 
    }
  }
  let action;
  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
	});
	
	test('Should successfully add new ticket data to masterTicketList', () => {
    const { names, location, issue, id } = ticketData;
    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });

  test('Should successfully update existing ticket data in masterTicketList', () => {
    const { names, location, issue, id } = ticketData;

    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    const newState = ticketListReducer({}, action);

    action = {
      type: 'ADD_TICKET',
      names: "harvey",
      location: "3b",
      issue: "halp",
      id: 1
    };

    const newState2 = ticketListReducer(newState, action);

    expect(newState2).toEqual({
      [id] : {
        names: "harvey",
        location: "3b",
        issue: "halp",
        id: id
      }
    });
  });

  test('Should successfully update only location property of existing ticket data in masterTicketList', () => {
    const { names, location, issue, id } = ticketData;

    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    const newState = ticketListReducer({}, action);

    action = {
      type: 'UPDATE_TICKET_LOCATION',
      issue: "actually meant to ask about mapStateToProps()",
      id: 1
    };

    const newState2 = ticketListReducer(newState, action);

    expect(newState2).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: "actually meant to ask about mapStateToProps()",
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_TICKET',
      id: 1
    };

    expect(ticketListReducer(currentState, action)).toEqual({
      2: {names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2 }
    });
  });
});