import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "../FormField";
import TextInput from "../inputs/TextInput";
import { useCreateReviewMutation } from "../../store/api/reviewApi";

export default function ReviewForm({ data }) {
  const [selectedRating, setSelectedRating] = useState(5);

  const { handleSubmit, control, setError, reset, setValue } = useForm({
    defaultValues: {
      rating: 5,
      content: "",
    },
    mode: "onTouched",
  });

  const [useCreateReview, { isLoading }] = useCreateReviewMutation();

  const handleSelectStar = (rating) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const onSubmit = async (formData) => {
    try {
      await useCreateReview({
        slug: data?.slug,
        productId: data?.id,
        ...formData,
        rating: selectedRating,
      }).unwrap();
      reset();
      setSelectedRating(5);
    } catch (error) {
      const errors = error?.data?.errors;
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-5 space-y-3">
      <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
        Viết nhận xét của bạn
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1 font-medium">
            Đánh giá sao:
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleSelectStar(star)}
                className="text-xl text-amber-400 cursor-pointer focus:outline-none"
              >
                {selectedRating >= star ? "★" : <span className="text-gray-200">★</span>}
              </button>
            ))}
            <span className="text-xs text-gray-500 ml-2 font-medium">
              ({selectedRating} / 5 sao)
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1 font-medium">
            Nội dung nhận xét:
          </label>
          <FormField
            control={control}
            name="content"
            placeholder="Nhận xét về chất lượng sản phẩm, giao hàng..."
            Component={TextInput}
            rules={{
              required: "Vui lòng nhập nội dung đánh giá",
            }}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-2.5 px-4 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wide transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </form>
    </div>
  );
}
