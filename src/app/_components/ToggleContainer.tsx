'use client'

import { useToggle } from "../_modules/store";
import Toggle from "./Toggle";

export default function ToggleContainer({ toggleName }: PropsType) {
  const {
    recruiting,
    joined,
    updateRecuiting,
    updateJoined
  } = useToggle();

  const toggleClickHandler = () => {
    toggleName === 'recruiting' ? updateRecuiting() : updateJoined();
  };

  switch (toggleName) {
    case 'recruiting':
      return (
        <Toggle state={recruiting} onClick={toggleClickHandler} />
      );
    case 'joined':
      return (
        <Toggle state={joined} onClick={toggleClickHandler} />
      );
  }
}

interface PropsType {
  toggleName: 'recruiting' | 'joined';
}