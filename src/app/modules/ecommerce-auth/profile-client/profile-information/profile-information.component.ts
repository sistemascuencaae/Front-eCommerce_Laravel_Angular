import { Component, Input } from '@angular/core';
import { ProfileClientService } from '../../_services/profile-client.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent {

  @Input() user_selected: any;

  name: any = null;
  surname: any = null;
  birthday: any = null;
  gender: any = null;
  email: any = null;
  phone: any = null;

  imagen_file: any = null;
  imagen_previzualiza: any = null;

  constructor(
    public _profileHomeService: ProfileClientService,
  ) { }

  ngOnInit(): void {

    this.name = this.user_selected.name;
    this.surname = this.user_selected.surname;
    this.birthday = this.user_selected.birthday;
    this.gender = this.user_selected.gender;
    this.email = this.user_selected.email;
    this.phone = this.user_selected.phone;

    console.log(this.user_selected);
  }

  processFile($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      alert('EL ARCHIVO CARGADO NO ES UNA IMAGEN');
      return;
    }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result;
  }

  save() {

    if (!this.name) {
      alert('EL NOMBRE ES OBLIGATORIO');
      return;
    }
    if (!this.surname) {
      alert('EL APELLIDO ES OBLIGAROIO');
      return;
    }
    if (!this.birthday) {
      alert('LA FECHA DE CUMPLEAÑOS ES OBLIGATORIO');
      return;
    }
    if (!this.email) {
      alert('EL EMAIL ES OBLIGATORIO');
      return;
    }

    let formData = new FormData();

    formData.append("name", this.name);
    formData.append("surname", this.surname);
    formData.append("birthday", this.birthday);
    formData.append("gender", this.gender);
    formData.append("email", this.email);
    if (this.phone) {
      formData.append("phone", this.phone);
    }
    if (this.imagen_file) {
      formData.append("imagen", this.imagen_file);
    }

    this._profileHomeService.updateProfile(formData).subscribe((resp: any) => {
      console.log(resp);
      this.user_selected = resp.user;
      alert("GENIAL SE REGISTRARON TUS CAMBIOS CORRECTAMENTE");
    });
  }
}
