import { useForm } from 'react-hook-form';
import { validateIncome, validateLoanAmount, validateAge } from '../utils/validators';
import LoadingSpinner from './LoadingSpinner';

export default function LoanForm({ onSubmit, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { CoapplicantIncome: 0 }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">A. Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Full Name</label>
            <input {...register("FullName", { required: "Name is required", minLength: { value: 2, message: "Min 2 chars" }})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition" />
            {errors.FullName && <span className="text-xs text-danger mt-1 block">{errors.FullName.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Age</label>
            <input type="number" {...register("Age", { validate: validateAge })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition" />
            {errors.Age && <span className="text-xs text-danger mt-1 block">{errors.Age.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Gender</label>
            <select {...register("Gender")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Marital Status</label>
            <select {...register("Married")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Dependents</label>
            <select {...register("Dependents")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Education</label>
            <select {...register("Education")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              <option value="Graduate">Graduate</option>
              <option value="Not Graduate">Not Graduate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Self Employed</label>
            <select {...register("Self_Employed")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-card">
        <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">B. Financial Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Annual Income</label>
            <input type="number" {...register("ApplicantIncome", { validate: validateIncome })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition" />
            {errors.ApplicantIncome && <span className="text-xs text-danger mt-1 block">{errors.ApplicantIncome.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Co-applicant Income</label>
            <input type="number" {...register("CoapplicantIncome")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Loan Amount</label>
            <input type="number" {...register("LoanAmount", { validate: validateLoanAmount })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition" />
            {errors.LoanAmount && <span className="text-xs text-danger mt-1 block">{errors.LoanAmount.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Loan Term (Months)</label>
            <select {...register("Loan_Amount_Term")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              {[12, 36, 60, 84, 120, 180, 240, 360].map(m => (
                <option key={m} value={m}>{m} months</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text mb-1">Credit History</label>
            <select {...register("Credit_History")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              <option value="1.0">1 — Good (meets guidelines)</option>
              <option value="0.0">0 — Bad (does not meet guidelines)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-card">
        <h3 className="text-lg font-semibold text-primary mb-4 border-b pb-2">C. Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Property Area</label>
            <select {...register("Property_Area")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition">
              <option value="Urban">Urban</option>
              <option value="Semiurban">Semiurban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Loan Purpose (Optional)</label>
            <input type="text" {...register("Purpose")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition" />
          </div>
        </div>
      </div>

      <button disabled={isLoading} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition flex items-center justify-center gap-2">
        {isLoading ? <LoadingSpinner size="sm" className="border-t-white" /> : "Predict Loan Approval →"}
      </button>
    </form>
  );
}
