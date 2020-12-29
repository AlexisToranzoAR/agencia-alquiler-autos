document.querySelectorAll('.action-delete').forEach(($deleteAction) => {
    $deleteAction.addEventListener('click', (e) => {
        const { id, brand, model } = $deleteAction.dataset;
        if (
            !confirm(
                `Confirma que desea eliminar el auto ${brand} ${model} (ID: ${id})? Esta operación no se puede deshacer`
            )
        ) {
            e.preventDefault();
            return false;
        }

        return true;
    });
});
