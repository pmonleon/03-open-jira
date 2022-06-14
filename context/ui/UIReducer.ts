import { UIState } from "./";

type UIActionType =
  | { type: "UI - Open sidebar" }
  | { type: "UI - Close sidebar" }
  | { type: "UI - adding entry"; payload: boolean }
  | { type: "UI - start dragging" }
  | { type: "UI - end dragging" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open sidebar":
      return {
        ...state,
        sideMenuOpen: true,
      };
    case "UI - Close sidebar":
      return {
        ...state,
        sideMenuOpen: false,
      };
    case "UI - adding entry":
      return {
        ...state,
        isAdding: action.payload,
      };
    case "UI - start dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - end dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
