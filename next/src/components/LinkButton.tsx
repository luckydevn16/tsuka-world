export interface HeaderLinkButtonProps {
    path: string;
    title: string;
    active: boolean;
    callback?: () => void;
  }
  
  export const HeaderLinkButton: React.FC<HeaderLinkButtonProps> = ({
    path,
    title,
    active,
    callback,
  }) => {
    return (
      <a
        onClick={callback}
        href={path}
        className={`${
          active ? "text-hover" : "text-gold"
        } font-normal whitespace-nowrap block rounded-md px-3 py-2.5 text-lg md:text-base`}
      >
        {title}
      </a>
    );
  };
  