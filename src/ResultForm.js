import React, { useState, useEffect } from "react";
import ResultDisplay from "./ResultDisplay";

const EXAMS = [
  { value: "jsc", label: "JSC/JDC" },
  { value: "ssc", label: "SSC/Dakhil/Equivalent" },
  { value: "hsc", label: "HSC/Alim/Equivalent" },
  { value: "dibs", label: "DIBS (Diploma in Business Studies)" }
];

const BOARDS = [
  { value: "barisal", label: "Barishal" },
  { value: "chittagong", label: "Chattogram" },
  { value: "comilla", label: "Cumilla" },
  { value: "dhaka", label: "Dhaka" },
  { value: "dinajpur", label: "Dinajpur" },
  { value: "jessore", label: "Jashore" },
  { value: "madrasah", label: "Madrasah" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "sylhet", label: "Sylhet" },
  { value: "mymensingh", label: "Mymensingh" },
  { value: "tec", label: "Technical" }
];

const RESULT_TYPES = [
  { value: "1", label: "Individual/Detailed Result" },
  { value: "8", label: "Individual/Detailed Rescrutiny/Others Result" },
  { value: "2", label: "Institution Result" },
  { value: "4", label: "Center Result" },
  { value: "5", label: "District Result" },
  { value: "6", label: "Institution Analytics" },
  { value: "7", label: "Board Analytics" }
];

const YEARS = Array.from({ length: 2025 - 1996 + 1 }, (_, i) => (2025 - i).toString());

function ResultForm() {
  const [form, setForm] = useState({
    exam: "",
    year: "",
    board: "",
    result_type: "",
    roll: "",
    reg: "",
    captcha: ""
  });
  const [captchaUrl, setCaptchaUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCaptcha = () => {
    setCaptchaUrl(`https://eboardresults.com/v2/captcha?t=${Date.now()}`);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://eboardresults.com/v2/getres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to fetch result. Try again or check your input.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Exam:
        <select name="exam" value={form.exam} onChange={handleChange} required>
          <option value="">Select</option>
          {EXAMS.map((ex) => (
            <option key={ex.value} value={ex.value}>{ex.label}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Year:
        <select name="year" value={form.year} onChange={handleChange} required>
          <option value="">Select</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Board:
        <select name="board" value={form.board} onChange={handleChange} required>
          <option value="">Select</option>
          {BOARDS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Result Type:
        <select name="result_type" value={form.result_type} onChange={handleChange} required>
          <option value="">Select</option>
          {RESULT_TYPES.map((rt) => (
            <option key={rt.value} value={rt.value}>{rt.label}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Roll:
        <input type="number" name="roll" value={form.roll} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Registration:
        <input type="number" name="reg" value={form.reg} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Captcha:
        <img src={captchaUrl} alt="captcha" style={{ verticalAlign: "middle", marginLeft: 8 }} />
        <button type="button" onClick={fetchCaptcha} style={{ marginLeft: 8 }}>Reload</button>
        <input type="number" name="captcha" value={form.captcha} onChange={handleChange} required style={{ marginLeft: 8 }} />
      </label>
      <br />
      <button type="submit" disabled={loading}>{loading ? "Loading..." : "View Result"}</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {result && <ResultDisplay result={result} />}
    </form>
  );
}

export default ResultForm; 