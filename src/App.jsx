import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getData, insertData, deleteBook, updateBook } from "./redux/bookSlice";
import "./index.css"; // Ensure Tailwind CSS is imported here

function App() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const [counter, setCounter] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);

  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);

  const updateTitleRef = useRef(null);
  const updatePriceRef = useRef(null);
  const updateDescriptionRef = useRef(null);

  useEffect(() => {
    dispatch(getData());
  }, [counter, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  const handleUpdate = () => {
    if (selectedBook) {
      const updatedBook = {
        title: updateTitleRef.current.value,
        price: parseFloat(updatePriceRef.current.value),
        description: updateDescriptionRef.current.value,
      };

      dispatch(updateBook({ id: selectedBook._id, updatedBook }))
        .unwrap()
        .then(() => {
          setCounter((prevCounter) => prevCounter + 1);
          setSelectedBook(null);
        })
        .catch((error) => {
          console.error("Failed to update book:", error);
        });
    }
  };

  const handleShowDetails = (book) => {
    setSelectedBook(book);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: parseFloat(priceRef.current.value),
    };
    dispatch(insertData(data));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      

      <main className="flex-grow container mx-auto mt-5 mb-5">
        <form
          className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {books.error && (
            <div className="bg-red-500 text-white p-2 mb-4 rounded">
              {books.error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Titre
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              placeholder="Titre du livre"
              ref={titleRef}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Prix
            </label>
            <input
              ref={priceRef}
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              placeholder="Prix"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              ref={descriptionRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              rows="3"
              placeholder="Description du livre"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ajouter
            </button>
          </div>
        </form>

        <div className="mt-5">
          {books.isLoading ? (
            <p className="text-center">Chargement ...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Titre</th>
                    <th className="py-2 px-4 border-b">Prix</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.books.map((book) => (
                    <tr key={book._id}>
                      <td className="py-2 px-4 border-b">{book.title}</td>
                      <td className="py-2 px-4 border-b">{book.price}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                          onClick={() => handleShowDetails(book)}
                          data-bs-toggle="modal"
                          data-bs-target="#detailsModal"
                        >
                          Détails
                        </button>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                          onClick={() => {
                            setSelectedBook(book);
                            document.getElementById("updateTitle").value =
                              book.title;
                            document.getElementById("updatePrice").value =
                              book.price;
                            document.getElementById("updateDescription").value =
                              book.description;
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#updateModal"
                        >
                          Modifier
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleDelete(book._id)}
                        >
                          Supprimer
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

      {/* Footer */}
      

      {/* Modals */}
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

      {/* Update Modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">
                Modifier Livre
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <label
                  htmlFor="updateTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Titre
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="updateTitle"
                  ref={updateTitleRef}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="updatePrice"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Prix
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="updatePrice"
                  ref={updatePriceRef}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="updateDescription"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="updateDescription"
                  rows="3"
                  ref={updateDescriptionRef}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
