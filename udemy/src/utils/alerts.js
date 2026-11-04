import Swal from "sweetalert2";

export const showSuccess = (title, text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1800,
    timerProgressBar: true,
    showConfirmButton: false,
    position: "center",
  });
};

export const showError = (title, text = "") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "OK",
    position: "center",
  });
};

export const showLoginRequired = (navigate) => {
  return Swal.fire({
    icon: "info",
    title: "Login required",
    text: "Please log in or create an account to add items to your cart.",
    showCancelButton: true,
    confirmButtonText: "Log in",
    cancelButtonText: "Keep browsing",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed && navigate) {
      navigate("/login");
    }
  });
};
