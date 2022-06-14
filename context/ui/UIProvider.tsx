import { FC, ReactNode, useReducer } from "react"
import { UIContext, uiReducer } from './' 


interface Props {
    children:  ReactNode
}

export interface UIState {
    sideMenuOpen: boolean,
    isAdding: boolean,
    isDragging: boolean

}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAdding: false,
    isDragging: false,
}


export const UiProvider: FC<Props> = ({children}) => {

    // @ts-ignore
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSidebar = () => {
        dispatch({type: 'UI - Open sidebar'}) 
    }

    const closeSidebar = () => {
        dispatch({type: 'UI - Close sidebar'})
    }

    const setIsAdding = (data: boolean) => {
        dispatch({
            type: 'UI - adding entry',
            payload: data
        })
    }

    const startDragging = () => {
        dispatch({type: 'UI - start dragging'})
    }

    const endDragging = () => {
        dispatch({type: 'UI - end dragging'})
    }

   
  return (
    <UIContext.Provider
        value={{
            // state
            ...state,
    
            // methods
            openSidebar,
            closeSidebar,
            setIsAdding,
            startDragging,
            endDragging
        }}
    >
        { children }
    </UIContext.Provider>
  )
}
