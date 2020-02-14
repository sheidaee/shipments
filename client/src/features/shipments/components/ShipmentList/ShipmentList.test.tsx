import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactTable from "react-table";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import wait from "waait";

import { ShipmentList } from "./ShipmentList";
import { shipmentItem } from "../../../../utilities/test-utils/dummyData";
import * as ReactReduxHooks from "../../../../hooks/react-redux.hooks";
import { IProps } from "./types";
import AuthProvider from "../../../../context/AuthProvider";


configure({ adapter: new Adapter() });

const PROPS: IProps = {
  shipmentRecords: [shipmentItem],
  loading: false,
  didSearch: false,
  searchedRecords: null
};

describe("<ShipmentList />", () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    /* mocking store */
    store = configureStore([thunk])({
      shipments: [shipmentItem],
      isLoading: false
    });

    /* mocking useDispatch on our mock store  */
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    /* mocking useSelector on our mock store */
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());

    wrapper = mount(
      <Provider store={store}>
        <AuthProvider>
          <ShipmentList {...PROPS} />
        </AuthProvider>
      </Provider>
    );
  });

  it("should render <ReactTable /> component", async () => {
    await wait(100);
    
    expect(wrapper.contains(<ReactTable />)).toEqual(true);
  });
});
