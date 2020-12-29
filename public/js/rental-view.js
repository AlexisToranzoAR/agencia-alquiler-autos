document.querySelectorAll('.action-delete').forEach(($deleteAction) => {
    $deleteAction.addEventListener('click', (e) => {
        const { id, carname, clientname } = $deleteAction.dataset;
        if (
            !confirm(
                `Confirma que desea eliminar el alquiler entre ${clientname} y ${carname} (ID: ${id})? Esta operación no se puede deshacer`
            )
        ) {
            e.preventDefault();
            return false;
        }

        return true;
    });
});
