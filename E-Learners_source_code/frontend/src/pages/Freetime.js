

export default function Freetime() {
  
  return (
    <div>
      <h1> Enter Freetime: </h1>
      <div className="form-group">
        {/* Inpute date */}
        <label for="start_date">Start Date</label>
        <input type="date" name="start_date"/>
        <label for="end_date">End Date</label>
        <input type="date" name="end_date"/>
        <button type="submit" className="btn btn-primary">Add Free Slot</button>

      </div>
    </div>
  )

}