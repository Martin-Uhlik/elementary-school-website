import type { IconType } from "react-icons";
import { LuExternalLink } from "react-icons/lu";

type Props = {
  href: string;
  title: string;
  description?: string;
  Icon: IconType;
};

// A large tile for a link people come to the page for, e.g. ordering lunch; opens the other site in a new tab
const FeatureLink = ({ href, title, description, Icon }: Props) => (
  <a href={href} target="_blank" className="feature-link">
    <span className="feature-link__icon" aria-hidden="true">
      <Icon focusable="false" />
    </span>
    <span className="feature-link__text">
      <span className="feature-link__title">{title}</span>
      {description && <span className="feature-link__description">{description}</span>}
      <span className="feature-link__domain">
        {new URL(href).hostname}
        <span className="visually-hidden"> (externí odkaz)</span>
      </span>
    </span>
    <LuExternalLink className="feature-link__arrow" aria-hidden="true" focusable="false" />
  </a>
);

export default FeatureLink;
