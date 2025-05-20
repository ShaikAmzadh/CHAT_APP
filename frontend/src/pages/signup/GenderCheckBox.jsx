const GenderCheckbox = ({ input, setInput }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            input.gender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            checked={input.gender === "male"}
            onChange={() => setInput({ ...input, gender: "male" })}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            input.gender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            checked={input.gender === "female"}
            onChange={() => setInput({ ...input, gender: "female" })}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
