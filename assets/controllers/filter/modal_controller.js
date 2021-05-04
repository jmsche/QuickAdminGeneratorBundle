import { Controller } from 'stimulus';
import 'select2';

export default class extends Controller {
    $filterModal;
    $filterForm;

    connect() {
        this.$filterModal = $('#filter-modal');
        this.$filterForm = this.$filterModal.find('#filter-form');

        if (this.$filterForm.find('.is-invalid').length) {
            setTimeout(() => this.open(null), 0)
        }

        this.$filterModal.find('form').on('submit', () => {
            this.$filterModal.modal('hide');
        })
    }

    open(event) {
        if (event !== null) {
            event.preventDefault();
        }
        const $filterForm = this.$filterForm;
        this.$filterModal.modal('show');
        if ($filterForm.html().trim() === '') {
            $.ajax({
                url: ajaxFilterUrl,
                type: "GET",
                success: function (res) {
                    $filterForm.html(res);
                    $filterForm.trigger('filter_shown');
                },
                error: function (res) {
                    alert('An error occurred.');
                }
            });
        } else {
            $filterForm.trigger('filter_shown');
        }
    }

}
