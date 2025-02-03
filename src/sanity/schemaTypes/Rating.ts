// schema/review.js
const reviewSchema = {
    name: "review",
    title: "Review",
    type: "document",
    fields: [
      {
        name: "text",
        title: "Review Text",
        type: "string",
      },
      {
        name: "rating",
        title: "Rating",
        type: "number",
        validation: (Rule: any) => Rule.min(1).max(5),
      },
      {
        name: "car",
        title: "Car",
        type: "reference",
        to: [{ type: "car" }],
      },
      {
        name: "user",
        title: "User",
        type: "string",
      },
    ],
  };

export default reviewSchema;
  