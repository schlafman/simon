import type { ComponentType } from 'react';
import { HomeIcon, InfoIcon } from './icons.tsx';
import './NavBar.css';

export type Screen = 'home' | 'about';

type Props = {
  active: Screen;
  onChange: (screen: Screen) => void;
};

const TABS: { id: Screen; label: string; Icon: ComponentType }[] = [
  { id: 'home', label: 'בית', Icon: HomeIcon },
  { id: 'about', label: 'אודות', Icon: InfoIcon },
];

export default function NavBar({ active, onChange }: Props) {
  return (
    <nav className="navbar" aria-label="ניווט ראשי">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className="navbar__tab"
          aria-current={active === id ? 'page' : undefined}
          onClick={() => onChange(id)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
