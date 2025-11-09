const getRatingStars = (rating) => "⭐".repeat(rating) + "☆".repeat(5 - rating);

export default getRatingStars;
