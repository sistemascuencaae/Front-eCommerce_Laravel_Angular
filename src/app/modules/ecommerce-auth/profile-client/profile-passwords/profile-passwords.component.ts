import { Component } from '@angular/core';
import { ProfileClientService } from '../../_services/profile-client.service';

@Component({
  selector: 'app-profile-passwords',
  templateUrl: './profile-passwords.component.html',
  styleUrls: ['./profile-passwords.component.scss']
})
export class ProfilePasswordsComponent {

  current_password: any = null;
  new_password: any = null;
  repeat_password: any = null;
  constructor(
    public _profileHomeService: ProfileClientService,
  ) { }

  ngOnInit(): void {
  }

  save() {
    if (this.new_password != this.repeat_password) {
      alert("LAS NUEVAS CONTRASEÑAS DEBEN SER IGUALES");
      return;
    }

    let data = {
      current_password: this.current_password,
      password: this.new_password,
    }

    this._profileHomeService.updateProfile(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alert(resp.message_text);
        return;
      }
      alert("GENIAL SE REGISTRARON TUS CAMBIOS DE CONTRASEÑA CORRECTAMENTE");
    })
  }
}
