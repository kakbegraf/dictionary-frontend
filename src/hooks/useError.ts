import Swal, {SweetAlertOptions} from 'sweetalert2'
export function useError() {
    const displayError = (error: string) => {
        const options: SweetAlertOptions = {
            position: 'top-end',
            icon: 'error',
            title: 'Something wrong!',
            text: error,
            showConfirmButton: false,
            timer: 2500,
            backdrop: 'swal2-backdrop-hide'
        }

        Swal.fire(options);
    }

    return {displayError};
}