import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, QrCode, Copy, Upload, CheckCircle2, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Gig } from '../types';

export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { package: pkg, gig } = (location.state as { package: Package; gig: Gig }) || {};
  
  const [step, setStep] = React.useState<'summary' | 'payment' | 'verification'>('summary');
  const [transactionId, setTransactionId] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);

  if (!pkg || !gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Invalid Session</h2>
          <button onClick={() => navigate('/')} className="mt-4 text-blue-600 font-bold">Return Home</button>
        </div>
      </div>
    );
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep('verification');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  (i === 1 && step === 'summary') || (i === 2 && step === 'payment') || (i === 3 && step === 'verification')
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : i < (step === 'summary' ? 1 : step === 'payment' ? 2 : 3)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {i < (step === 'summary' ? 1 : step === 'payment' ? 2 : 3) ? <CheckCircle2 className="w-5 h-5" /> : i}
                </div>
                {i < 3 && <div className={`w-12 h-0.5 mx-2 ${i < (step === 'summary' ? 1 : step === 'payment' ? 2 : 3) ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  Order Summary
                </h2>

                <div className="flex items-start space-x-6 mb-8 p-4 bg-gray-50 rounded-xl">
                  <img src={gig.image} className="w-32 h-20 object-cover rounded-lg shadow-sm" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{gig.title}</h3>
                    <p className="text-sm text-gray-500">Package: <span className="font-bold text-blue-600">{pkg.type}</span></p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Service Price</span>
                    <span className="font-bold text-gray-900">${pkg.price}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service Fee</span>
                    <span className="font-bold text-gray-900">$2.00</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-3xl font-extrabold text-blue-600">${pkg.price + 2}.00</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => navigate(-1)} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all">Back</button>
                  <button onClick={() => setStep('payment')} className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Confirm & Pay</button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Manual UPI Payment</h2>
                  <p className="text-gray-500 text-sm">Scan the QR code below to pay <span className="font-bold text-gray-900">${pkg.price + 2}</span></p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 text-center space-y-4">
                    <div className="bg-gray-50 p-6 rounded-2xl inline-block border-2 border-blue-100">
                      <QrCode className="w-48 h-48 text-gray-900" />
                    </div>
                    <div className="flex items-center justify-center space-x-2 bg-blue-50 py-2 px-4 rounded-full">
                      <span className="text-sm font-bold text-blue-700">edulance@upi</span>
                      <button className="text-blue-400 hover:text-blue-600"><Copy className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="flex-1 w-full space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Transaction ID / UTR</label>
                      <input 
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Enter 12-digit transaction ID"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Payment Screenshot</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer relative">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Upload screenshot</p>
                        <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isUploading}
                      className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center"
                    >
                      {isUploading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Submit for Verification'}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'verification' && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Clock className="w-10 h-10 text-blue-600 animate-pulse" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Pending Verification</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                Our team is currently verifying your payment. Your project will start within <span className="font-bold text-blue-600">2 hours</span>.
              </p>
              <button onClick={() => navigate('/dashboard')} className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all">Go to Dashboard</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
