import React from "react";

type ContextType = {
  showModal: (modalType: JSX.Element, modalProps?: any) => void;
  hideModal: () => void;
};

const initalState: ContextType = {
  showModal: () => {},
  hideModal: () => {},
};

const GlobalModalContext = React.createContext(initalState);
export const useGlobalModalContext = () => React.useContext(GlobalModalContext);

export const GlobalModal: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [modal, setModal] = React.useState<JSX.Element>();
  const showModal = (Modal: JSX.Element) => {
    // eslint-disable-next-line
    setModal(<Modal.type {...Modal?.props} />);
  };

  const hideModal = () => {
    setModal(undefined);
  };

  return (
    <GlobalModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modal}
    </GlobalModalContext.Provider>
  );
};
