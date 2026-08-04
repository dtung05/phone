import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "../FormField";
import TextInput from "../inputs/TextInput";
import { useCreateReviewMutation } from "../../store/api/reviewApi";

export default function ReviewForm({ data }) {
  const { handleSubmit, control, watch, setError, reset } = useForm({
    defaultValues: {
      rating: 1,
      content: "",
    },
    mode: "onTouched",
  });
  const [useCreateReview, { isLoading, error }] = useCreateReviewMutation();
  const onSubmit = async (formData) => {
    
    try {
      const result = await useCreateReview({
        slug: data.slug,
        productId: data.id,
        ...formData,
      }).unwrap();
      reset();
      console.log(result);
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
    <div className="mt-10 bg-white rounded-2xl border p-6 w-152">
      <h2 className="text-xl font-bold mb-6">Viết đánh giá</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          control={control}
          name="content"
          placeholder="Viết đánh giá của bạn"
          Component={TextInput}
          rules={{
            required: "Không được để trống form",
          }}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="mt-2 w-full rounded-lg bg-[#006b5c] py-3 text-sm font-bold text-white transition-all hover:bg-[#005247] hover:shadow-lg active:scale-[0.99]"
        >
          {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </form>
    </div>
  );
}
