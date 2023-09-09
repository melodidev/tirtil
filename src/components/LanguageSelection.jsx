function LanguageButton(props) {
  let classNames = "rounded text-uppercase border-0 px-2 py-1 me-1";
  if (props.active) {
    classNames = `bg-secondary text-light ${classNames}`;
  } else {
    classNames = `bg-grey text-secondary ${classNames}`;
  }

  return (
    <button
      type="button"
      className={classNames}
      onClick={() => props.changeLanguage(props.language)}
    >
      {props.language}
    </button>
  );
}

export default function LanguageSelection(props) {
  return (
    <div className="position-absolute top-0 end-0 me-1 mt-2">
      {["en", "tr"].map((lang) => (
        <LanguageButton
          language={lang}
          active={props.language === lang}
          changeLanguage={props.changeLanguage}
        />
      ))}
    </div>
  )
}
