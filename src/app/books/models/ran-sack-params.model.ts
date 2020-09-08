export class RanSackParams {

  public searchText: string;
  public authorIds: number[] = [];
  public genreNames: string[] = [];

  public clear(): void {
    this.authorIds = [];
    this.genreNames = [];
    this.searchText = undefined;
  }

}
