const InputCard = ({title, buttonText, children}) => {
  return (
      <section role="form" className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mx-4">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
          {children}
          <button
            type="submit"
            aria-label={buttonText}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
          >
            {buttonText}
          </button>
      </section>
  )
}
export default InputCard;