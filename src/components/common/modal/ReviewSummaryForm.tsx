import { Plus } from 'lucide-react'

type ReviewSummaryFormProps = {
  comment: string
  setComment: (comment: string) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  imagePreviews: string[]
}

const ReviewSummaryForm = ({
  comment,
  setComment,
  handleFileChange,
  imagePreviews,
}: ReviewSummaryFormProps) => {
  return (
    <>
      <div className="mt-12">
        <p className="text-black-200 border-b-2 pb-3 text-xl font-bold">
          시음 사진 등록하기 <span className="font-normal">(선택)</span>
        </p>
        <div className="mt-7">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={preview} className="relative">
                <img
                  src={preview}
                  alt={`미리보기 ${index + 1}`}
                  className="h-[150px] w-[150px] rounded-[10px] object-cover"
                />
              </div>
            ))}

            <div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex-center hover:bg-gray-150 h-[150px] w-[150px] cursor-pointer rounded-[10px] bg-gray-50 transition"
                aria-label="사진 등록"
              >
                <Plus size={24} className="text-black-200" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-black-200 border-b-2 pb-3 text-xl font-bold">
          시음 한 줄 평 <span className="font-normal">(선택)</span>
        </p>
        <div className="flex items-center justify-center">
          <textarea
            placeholder="시음 한 줄 평을 작성해 주세요."
            rows={2}
            maxLength={100}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="text-black-200 mt-8 h-25 w-140 resize-none rounded-[6px] border border-gray-300 px-4 py-3 text-lg placeholder-gray-700 outline-none"
          />
        </div>
      </div>
    </>
  )
}

export default ReviewSummaryForm
