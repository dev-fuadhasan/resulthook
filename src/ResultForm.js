import React, { useState, useEffect } from 'react';
import { fetchCaptcha } from './api';

const EXAMS = [
  { value: 'ssc', label: 'SSC' },
  { value: 'hsc', label: 'HSC' },
  { value: 'jsc', label: 'JSC' },
];
const BOARDS = [
  { value: 'dhaka', label: 'Dhaka' },
  { value: 'chittagong', label: 'Chittagong' },
  { value: 'rajshahi', label: 'Rajshahi' },
  { value: 'barisal', label: 'Barisal' },
  { value: 'comilla', label: 'Comilla' },
  { value: 'dinajpur', label: 'Dinajpur' },
  { value: 'jessore', label: 'Jessore' },
  { value: 'mymensingh', label: 'Mymensingh' },
  { value: 'sylhet', label: 'Sylhet' },
  { value: 'madrasah', label: 'Madrasah' },
  { value: 'tec', label: 'Technical' },
];

export default function ResultForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    exam: 'ssc',
    year: new Date().getFullYear().toString(),
    board: 'dhaka',
    roll: '',
    reg: '',
    captcha: '',
  });
  const [captchaImg, setCaptchaImg] = useState('');
  const [session, setSession] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    setError('');
    try {
      const { image, session } = await fetchCaptcha();
      setCaptchaImg(image);
      setSession(session);
    } catch (e) {
      setError('Could not load captcha. Try reload.');
    }
    setCaptchaLoading(false);
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...form, session });
  };

  return (
    <form onSubmit={handleSubmit} className="result-form">
      <div className="form-group">
        <label>Exam</label>
        <select name="exam" value={form.exam} onChange={handleChange} required>
          {EXAMS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Year</label>
        <input name="year" type="number" value={form.year} onChange={handleChange} required min="2000" max={new Date().getFullYear()} />
      </div>
      <div className="form-group">
        <label>Board</label>
        <select name="board" value={form.board} onChange={handleChange} required>
          {BOARDS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Roll</label>
        <input name="roll" type="text" value={form.roll} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Registration</label>
        <input name="reg" type="text" value={form.reg} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Captcha</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {captchaImg && <img src={captchaImg} alt="captcha" style={{ height: 40, marginRight: 8 }} />}
          <button type="button" onClick={loadCaptcha} disabled={captchaLoading} style={{ marginRight: 8 }}>
            {captchaLoading ? 'Loading...' : 'Reload'}
          </button>
          <input name="captcha" type="text" value={form.captcha} onChange={handleChange} required maxLength={4} style={{ width: 120 }} />
        </div>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>Get Result</button>
    </form>
  );
} 