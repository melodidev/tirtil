export default function PopUp(props) {
  return (
    <div className="position-absolute start-0 end-0 text-dark bg-light text-light width-200 rounded border border-3 border-secondary text-center popup-animation ms-auto me-auto mt-4 py-2">
      {props.message}
    </div>
  )
}
