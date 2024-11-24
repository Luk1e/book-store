import { Faker, ru, fr, en } from "@faker-js/faker";

export const generateBook = (
  index,
  seed,
  language,
  likesPerBook,
  reviewsPerBook
) => {
  let fakerLanguage;

  switch (language) {
    case "fr":
      fakerLanguage = fr;
      break;
    case "ru":
      fakerLanguage = ru;
      break;
    default:
      fakerLanguage = en;
      break;
  }

  const customFaker = new Faker({
    locale: [fakerLanguage],
  });

  customFaker.seed(seed + index);

  const actualReviews = Array.from(
    { length: Math.floor(reviewsPerBook) },
    () => ({
      text: customFaker.lorem.paragraph(),
      author: customFaker.person.fullName(),
      company: customFaker.company.name(),
    })
  );

  if (Math.random() < reviewsPerBook % 1) {
    actualReviews.push({
      text: customFaker.lorem.paragraph(),
      author: customFaker.person.fullName(),
      company: customFaker.company.name(),
    });
  }

  const actualLikes =
    Math.random() < likesPerBook % 1
      ? Math.ceil(likesPerBook)
      : Math.floor(likesPerBook);

  return {
    id: customFaker.number.int(),
    isbn: customFaker.commerce.isbn(),
    title: customFaker.commerce.productName(),
    author:
      Math.random() > 0.7
        ? `${customFaker.person.fullName()}, ${customFaker.person.fullName()}`
        : customFaker.person.fullName(),
    publisher: `${customFaker.company.name()}, ${customFaker.date
      .past()
      .getFullYear()}`,
    likes: actualLikes,
    reviews: actualReviews,
    coverColor: customFaker.color.rgb(),
  };
};

export const generateBooks = (
  seed,
  page,
  language,
  likesPerBook,
  reviewsPerBook,
  booksPerPage = 20
) => {
  const startIndex = page * booksPerPage;
  return Array.from({ length: booksPerPage }, (_, i) =>
    generateBook(
      startIndex + i + 1,
      seed,
      language,
      likesPerBook,
      reviewsPerBook
    )
  );
};
