{
  description = "Development environment for project Stress";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };

  outputs = { nixpkgs, ... }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          stress = pkgs.mkShellNoCC {
            name = "stress";
            packages = [
              pkgs.nodejs_24
              pkgs.jdk21_headless
            ];
          };
        in
        {
          default = stress;
          inherit stress;
        }
      );
    };
}
