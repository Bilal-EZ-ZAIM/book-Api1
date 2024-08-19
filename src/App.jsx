import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getData } from "./redux/bookSlice";
import "./index.css"; // Ensure Tailwind CSS is imported here

function App() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleShowDetails = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white text-center py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue à notre Librairie
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Découvrez une vaste collection de livres pour tous les goûts et tous
            les âges.
          </p>
          <a
            href="#books"
            className="bg-white text-blue-500 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300"
          >
            Explorer les Livres
          </a>
        </div>
      </section>

      <main className="flex-grow container mx-auto mt-5 mb-5">
        <div className="mt-5" id="books">
          {books.isLoading ? (
            <p className="text-center text-lg">Chargement ...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                      Titre
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                      Prix
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.books.map((book) => (
                    <tr
                      key={book._id}
                      className="hover:bg-gray-50 transition duration-300"
                    >
                      <td className="py-4 px-6 border-b text-sm text-gray-900">
                        {book.title}
                      </td>
                      <td className="py-4 px-6 border-b text-sm text-gray-900">
                        {book.price}
                      </td>
                      <td className="py-4 px-6 border-b text-sm text-gray-900">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleShowDetails(book)}
                          data-bs-toggle="modal"
                          data-bs-target="#detailsModal"
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      <div
        className="modal fade"
        id="detailsModal"
        tabIndex="-1"
        aria-labelledby="detailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailsModalLabel">
                Détails du Livre
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedBook ? (
                <div>
                  <p>
                    <strong>Titre:</strong> {selectedBook.title}
                  </p>
                  <p>
                    <strong>Prix:</strong> {selectedBook.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedBook.description}
                  </p>
                </div>
              ) : (
                <p>Veuillez sélectionner un livre pour voir les détails.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
