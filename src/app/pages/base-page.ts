import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

export abstract class BasePage {
    protected readonly route = inject(ActivatedRoute);
    protected readonly title = inject(Title);
    protected readonly meta = inject(Meta);

    constructor() {
        const data = this.route.snapshot.data;

        if (data['title']) {
            this.title.setTitle(data['title']);
        }

        if (data['description']) {
            this.meta.updateTag({
                name: 'description',
                content: data['description'],
            });
        }
    }
}
