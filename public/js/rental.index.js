document.querySelectorAll('.action-delete').forEach(($deleteAction) => {
    $deleteAction.addEventListener('click', (e) => {
        const { id, car, client } = $deleteAction.dataset;
        if (
            !confirm(
                `Confirma que desea eliminar el alquiler entre ${client} y ${car} (ID: ${id})? Esta operación no se puede deshacer`
            )
        ) {
            e.preventDefault();
            return false;
        }

        return true;
    });
});
