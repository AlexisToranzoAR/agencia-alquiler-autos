document.querySelectorAll('.action-unblock').forEach(($unblockAction) => {
    $unblockAction.addEventListener('click', (e) => {
        const { id, carname, clientname } = $unblockAction.dataset;
        if (
            !confirm(
                `Confirma que desea confirmar el alquiler entre ${clientname} y ${carname} (ID: ${id})?`
            )
        ) {
            e.preventDefault();
            return false;
        }
        
        return true;
    });
});

document.querySelectorAll('.action-pending').forEach(($pendingAction) => {
    $pendingAction.addEventListener('click', (e) => {
        const { id, carname, clientname } = $pendingAction.dataset;
        if (
            !confirm(
                `Confirma que desea marcar como pago el alquiler entre ${clientname} y ${carname} (ID: ${id})?`
            )
        ) {
            e.preventDefault();
            return false;
        }
        
        return true;
    });
});

document.querySelectorAll('.action-finish').forEach(($finishAction) => {
    $finishAction.addEventListener('click', (e) => {
        const { id, carname, clientname } = $finishAction.dataset;
        if (
            !confirm(
                `Confirma que desea finalizar el alquiler entre ${clientname} y ${carname} (ID: ${id})?`
            )
        ) {
            e.preventDefault();
            return false;
        }
        
        return true;
    });
});
