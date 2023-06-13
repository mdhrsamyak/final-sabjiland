import UploadImg from "../../uploadImage";
import BestSellers from "./bestSeller";
import Products from "./products";

export default function Home() {
  const headers = ["id", "Name"];

  const rowsPerPage = [50, 100, 200];
  const defaultRowsPerPage = 50;
  return (
    <div>
      <h1 className="admin-title">Ad Section</h1>
      <UploadImg dimension="1160*590" setMultiple={true} dropClass="home-img" />

      <div>
        <BestSellers
          headers={headers}
          rowsPerPage={rowsPerPage}
          defaultRowsPerPage={defaultRowsPerPage}
        />
      </div>
      <div>
        <h1 className="admin-title">Ad Section</h1>
        <UploadImg dimension="1160*590" setMultiple={true} />
      </div>
    </div>
  );
}
