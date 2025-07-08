import Swal from "sweetalert2";

const TestPaperCard = ({ paper }) => {
  const { image, name, subject, publication, publishedYear, pages, fileSize } =
    paper;

  const handleTestPaper = () => {
    Swal.fire(
      "Sorry dear student!",
      "Currently this option is not available",
      "error"
    );
  };

  return (
    <div className="card  card-side bg-base-100 dark:bg-gray-700 pl-3 shadow-md hover:shadow-xl transition border border-base-200">
      <figure>
        <img
          src={image}
          alt={name}
          className="h-52 w-full object-cover border-b border-base-200 rounded"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{name}</h2>
        <div className="text-sm space-y-1">
          <p>
            <strong>Subject:</strong> {subject}
          </p>
          <p>
            <strong>Publication:</strong> {publication}
          </p>
          <p>
            <strong>Year:</strong> {publishedYear}
          </p>
          <p>
            <strong>Pages:</strong> {pages}
          </p>
          <p>
            <strong>Size:</strong> {fileSize}
          </p>
        </div>
        <div className="card-actions justify-end mt-3">
          <button onClick={handleTestPaper} className="btn btn-sm btn-primary">
            View
          </button>
          <button
            onClick={handleTestPaper}
            className="btn btn-sm btn-outline btn-primary"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPaperCard;
