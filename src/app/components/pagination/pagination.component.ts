import { Input, Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

    @Input() totalItems: number;
    @Input() perPageItems: number;
    @Input() currentPage: number;
    @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

    public totalPages: number;
    public dotsStep = 5;
    public pagesEndIndex = 5;
    public pagesStartIndex = 0;
    public totalPagesArr: number[] = [];

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes) {
        this.calculatePages();
    }

    private calculatePages(): void {
        this.totalPagesArr = [];
        this.totalPages = Math.ceil(this.totalItems / this.perPageItems);
        for (let i = 1; i <= this.totalPages; i++) {
            this.totalPagesArr.push(i);
        }
        this.setSliceIndex();
    }

    public setPage(page: number): void {
        this.currentPage = page;
        this.setSliceIndex();
        this.onClick.emit(page);
    }

    public setSliceIndex(): void {
        const quotient = Math.floor(this.currentPage / this.dotsStep);
        if  (quotient >= 1) {
            this.pagesStartIndex = (quotient * this.dotsStep) - 1;
            this.pagesEndIndex = (this.pagesStartIndex + this.dotsStep) + 1;
        } else {
            this.pagesStartIndex = 0;
            this.pagesEndIndex = 5;
        }
    }

    public prevDots(): void {
        const currentPage = this.currentPage - this.dotsStep;
        if (currentPage < 0) {
            return this.setPage(0);
        }
        this.setPage(currentPage);
    }

    public nextDots(): void {
        const currentPage = this.currentPage + this.dotsStep;
        if (currentPage > this.totalPages) {
            return this.setPage(currentPage);
        }
        this.setPage(currentPage);
    }

    public nextPage(): void {
        if (this.currentPage === this.totalPages) { return; }
        this.currentPage++;
        this.setSliceIndex();
        this.onClick.emit(this.currentPage);
    }

    public prevPage(): void {
        if (this.currentPage === 1) { return; }
        this.currentPage--;
        this.setSliceIndex();
        this.onClick.emit(this.currentPage);
    }
}
