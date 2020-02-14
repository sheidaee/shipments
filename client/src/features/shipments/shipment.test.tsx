import { shipmentReducer as reducer } from "./reducers";
import { shipmentActionNameTypes } from "./types";

describe("shipment reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual({
      shipments: null,
      didSearch: false,
      loading: false,
      searchedRecords: null
    });
  });

  it("should store shipment records after fetching data from the server", () => {
    expect(
      reducer(
        {
          error: false,
          loading: false,
          didSearch: false
        },
        {
          type: shipmentActionNameTypes.FETCH_LIST_COMPLETED,
          payload: {
            records: []
          }
        }
      )
    ).toEqual({
      error: false,
      loading: false,
      didSearch: false,
      shipments: []
    });
  });
});
