import * as React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { Provider } from "react-redux";

import * as ReactReduxHooks from "../../../../hooks/react-redux.hooks";
import { EditShipment } from "./EditShipment";
import { shipmentItem } from "../../../../utilities/test-utils/dummyData";
import AuthProvider from "../../../../context/AuthProvider";

configure({ adapter: new Adapter() });

describe("<EditShipment />", () => {
  let store: any;
  let onEditShipment;
  let dialogCloseHandler;
  let subject: any;
  let data;

  beforeEach(() => {
    /* mocking store */
    store = configureStore([thunk])({
      shipmentRecords: [shipmentItem],
      app: {
        loading: false
      }
    });

    /* mocking useDispatch on our mock store  */
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    /* mocking useSelector on our mock store */
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());

    onEditShipment = sinon.stub().returns(Promise.resolve());
    dialogCloseHandler = () => {};
    data = {
      _id: 1,
      name: "jeans",
      origin: "a",
      destination: "b",
      assignee: 1,
      orderStatus: 2,
      pickupDate: null,
      deliveryDate: null
    };

    const props = {
      initialValues: {},
      onEditShipment,
      dialogCloseHandler,
      data
    };

    subject = mount(
      <Provider store={store}>
        <AuthProvider>
          <EditShipment {...props} />
        </AuthProvider>
      </Provider>
    );
  });

  it("exists", () => {
    expect(subject.exists()).toEqual(true);
  });
});
