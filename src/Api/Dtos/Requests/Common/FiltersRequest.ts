abstract class FiltersRequest<T> {
  public and?: readonly T[];
  public or?: readonly T[];
}

export default FiltersRequest;
