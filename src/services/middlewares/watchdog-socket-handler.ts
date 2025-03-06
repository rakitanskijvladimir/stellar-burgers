import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../global-vault";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

export type TWsAction = {
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsEnd: ActionCreatorWithoutPayload;
  wsStart: ActionCreatorWithPayload<string>;
  wsError: ActionCreatorWithPayload<any>;
  wsRequest: ActionCreatorWithPayload<any>;
};

export const wsMiddleware = (wsActions: TWsAction): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsStart, wsEnd, wsOpen, wsClose, wsError, wsRequest } = wsActions;

      if (wsStart.match(action)) {
        console.log("Starting WebSocket connection with URL:", action.payload);
        socket = new WebSocket(action.payload);

        socket.onopen = () => {
          console.log("WebSocket connection opened");
          dispatch(wsOpen());
        };

        socket.onerror = (event) => {
          console.error("WebSocket error:", event);
          dispatch(wsError("WebSocket encountered an error"));
        };

        socket.onmessage = (event) => {
          console.log("Raw WebSocket message received:", event.data);
          try {
            const parsedData = JSON.parse(event.data);
            console.log("Parsed WebSocket data:", parsedData);

            if (!parsedData.success) {
              dispatch(
                wsError(`WebSocket message error: ${parsedData.message}`)
              );
            } else {
              console.log("Dispatching wsRequest with data:", parsedData);
              dispatch(wsRequest(parsedData));
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
            dispatch(wsError("Error parsing message"));
          }
        };

        socket.onclose = (event) => {
          console.log(`WebSocket closed: ${event.code}`);
          dispatch(wsClose());
        };
      }

      if (wsEnd.match(action)) {
        console.log("Closing WebSocket connection...");
        if (socket) {
          socket.close();
          socket = null;
        }
        dispatch(wsClose());
      }

      next(action);
    };
  }) as Middleware;
};
