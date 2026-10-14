import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useToast } from '../../context/ToastContext';
import { Product, Review } from '../../types/ecommerce';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddReview: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddReview
}) => {
  const { showToast } = useToast();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !reviewText.trim()) {
      showToast('Please fill out your name and review', 'warning');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: userName.trim(),
      rating,
      date: new Date().toISOString().split('T')[0],
      title: title.trim() || 'Great product!',
      review: reviewText.trim(),
      verified: true
    };

    onAddReview(newReview);
    showToast('Thank you! Your review has been submitted.', 'success');
    setUserName('');
    setTitle('');
    setReviewText('');
    setRating(5);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Write a Review for ${product.name}`} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Rating selection */}
        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Your Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 text-amber-400 focus:outline-none"
              >
                <Star
                  className={`w-7 h-7 ${
                    (hoverRating || rating) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-xs font-bold text-slate-700">
              {hoverRating || rating} out of 5 stars
            </span>
          </div>
        </div>

        {/* User Name */}
        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Sarah Connor"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
            Review Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Exceeded my expectations!"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Review body */}
        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
            Your Review *
          </label>
          <textarea
            required
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write details about what you liked or disliked..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Submit Review
          </button>
        </div>

      </form>
    </Modal>
  );
};
