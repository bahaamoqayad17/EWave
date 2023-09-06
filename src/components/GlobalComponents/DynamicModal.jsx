import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/RootSlice";
import EditArticle from "../modals/EditArticle";
import EditCategory from "../modals/EditCategory";
import EditVideo from "../modals/EditVideo";
import EditRecommendation from "../modals/EditRecommendation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function DynamicModal(props) {
  const { closeAllModals } = useSelector(({ root }) => root);
  const dispatch = useDispatch();
  const handleCloseModal = () => props.setOpenModal(false);

  if (closeAllModals) {
    handleCloseModal();
    dispatch(closeModal(false));
  }
  const componentsName = {
    articles: EditArticle,
    categories: EditCategory,
    videos: EditVideo,
    recommendations: EditRecommendation,
  };

  const DynamicComponentName = componentsName[props.model];
  return (
    <>
      <Modal
        open={props.open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DynamicComponentName
            item={props.item}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </>
  );
}
