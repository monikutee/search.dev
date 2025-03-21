import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  position: sticky;
  border-bottom: 1px solid #dee5ed;
  top: 0;
  background: white;
  max-width: 1200px;
  margin: auto;
  height: 80px;
  z-index: 100;

  button,
  a {
    border-radius: 20px;
  }
`;

export const StyledLayout = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 100px;
  min-height: calc(100vh - 200px);

  @media screen and (max-width: 762px) {
    padding: 20px;
  }
`;

export const StyledFooter = styled.div`
  padding: 15px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: #486284;

    &:hover {
      color: #89a1bf;
    }
  }
`;
