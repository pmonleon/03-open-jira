import { createContext } from "react";

interface ContextProps {
    // state
    sideMenuOpen: boolean,
    isAdding: boolean,
    isDragging: boolean,
    // methods
    openSidebar: () => void,
    closeSidebar: () => void,
    setIsAdding: (data: boolean) => void,
    startDragging: () => void,
    endDragging: () => void
}

export const UIContext = createContext({} as ContextProps);



